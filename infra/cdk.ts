import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsp from 'aws-cdk-lib/aws-ecs-patterns';
import * as ecra from 'aws-cdk-lib/aws-ecr-assets';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as secret from 'aws-cdk-lib/aws-secretsmanager';

import {
  Keys,
  Stacks,
  Vpc,
  CostCenterParentValues,
  ProjectValues,
  CertificateManager,
  Core,
} from '@gyg/cdk-utils-v2';
import { getEnvironment, ConfigKey } from '@gyg/utils';
import { InfraConstants } from './constants';

import { join } from 'path';
import { getConstants, getPublicHostedZone } from './common';

/**
 * Create the api stack
 */
Stacks.createAppStack({
  stackName: `${InfraConstants.StackName}`,
  extraTagsOverride: [
    { key: Keys.CostCenterParent, value: CostCenterParentValues.Digital },
    { key: Keys.Project, value: ProjectValues.Default },
  ],
  setDefaultBhyveStackPrefix: false,
  stackFunc: async (stack) => {
    const constants = getConstants();

    const hostName = constants.Resto365.DomainName;
    const apiDomain = constants.Resto365.ApiDomainName;
    const apiPort = 3000;

    const publicHostedZone = getPublicHostedZone(stack);

    const acmCertificate = CertificateManager.createDnsValidatedCertificate({
      identifier: 'Certificate',
      domainName: hostName,
      subjectAlternativeNames: [`*.${hostName}`],
      hostedZone: publicHostedZone,
      region: getEnvironment().region ?? stack.region,
      stack,
    });

    const vpc = Vpc.getVpc(stack, 'vpc', {
      vpcName: constants.Resto365.Vpc,
    });

    const imageAsset = new ecra.DockerImageAsset(
      stack,
      `${InfraConstants.ProjectName}DockerImageAsset`,
      {
        directory: join(__dirname, '..'),
        platform: ecra.Platform.LINUX_ARM64,
        exclude: ['.npmrc'],
      },
    );

    const resto365BhyveDbCredentials = secret.Secret.fromSecretNameV2(
      stack,
      'Bhyve DB Credentials in apps.test and apps.prod',
      constants.Resto365.SecretsNameBhyveDb,
    );

    const r365DbCredentials = secret.Secret.fromSecretNameV2(
      stack,
      'R365 DB Credentials in ops.test and ops.prod',
      constants.Resto365.SecretsNameResto365Db,
    );

    const r365OktaCredentials = secret.Secret.fromSecretNameV2(
      stack,
      'R365 Okta Credentials',
      'r365/okta/credentials',
    );

    const resto365CerebroDbCredentials = secret.Secret.fromSecretNameV2(
      stack,
      'Cerebro DB Credentials in apps.test and apps.prod',
      'r365/Cerebro/credentials',
    );

    const resto365BhyveConfig = secret.Secret.fromSecretNameV2(
      stack,
      'Bhyve config in apps.test and apps.prod',
      'r365/Bhyve/config',
    );

    const imageOptions: cdk.aws_ecs_patterns.ApplicationLoadBalancedTaskImageOptions =
      {
        containerName: InfraConstants.ProjectName,
        image: ecs.ContainerImage.fromDockerImageAsset(imageAsset),
        secrets: {
          DB_HOST: ecs.Secret.fromSecretsManager(
            resto365BhyveDbCredentials,
            'host',
          ),
          DB_PORT: ecs.Secret.fromSecretsManager(
            resto365BhyveDbCredentials,
            'port',
          ),
          DB_NAME: ecs.Secret.fromSecretsManager(
            resto365BhyveDbCredentials,
            'db',
          ),
          DB_USER: ecs.Secret.fromSecretsManager(
            resto365BhyveDbCredentials,
            'user',
          ),
          DB_PASSWORD: ecs.Secret.fromSecretsManager(
            resto365BhyveDbCredentials,
            'password',
          ),
          R365_DB_HOST: ecs.Secret.fromSecretsManager(
            r365DbCredentials,
            'host',
          ),
          R365_DB_PORT: ecs.Secret.fromSecretsManager(
            r365DbCredentials,
            'port',
          ),
          R365_DB_NAME: ecs.Secret.fromSecretsManager(
            r365DbCredentials,
            'dbname',
          ),
          R365_DB_USER: ecs.Secret.fromSecretsManager(
            r365DbCredentials,
            'username',
          ),
          R365_DB_PASSWORD: ecs.Secret.fromSecretsManager(
            r365DbCredentials,
            'password',
          ),
          OKTA_API_KEY: ecs.Secret.fromSecretsManager(
            r365OktaCredentials,
            'apiKey',
          ),
          OKTA_DOMAIN: ecs.Secret.fromSecretsManager(
            r365OktaCredentials,
            'domain',
          ),
          OKTA_APP_ID: ecs.Secret.fromSecretsManager(
            r365OktaCredentials,
            'appId',
          ),
          CEREBRO_SQL_DB_HOST: ecs.Secret.fromSecretsManager(
            resto365CerebroDbCredentials,
            'host',
          ),
          CEREBRO_SQL_DB_PORT: ecs.Secret.fromSecretsManager(
            resto365CerebroDbCredentials,
            'port',
          ),
          CEREBRO_SQL_DB_NAME: ecs.Secret.fromSecretsManager(
            resto365CerebroDbCredentials,
            'dbname',
          ),
          CEREBRO_SQL_DB_USER: ecs.Secret.fromSecretsManager(
            resto365CerebroDbCredentials,
            'username',
          ),
          CEREBRO_SQL_DB_PASSWORD: ecs.Secret.fromSecretsManager(
            resto365CerebroDbCredentials,
            'password',
          ),
          BHYVE_URL: ecs.Secret.fromSecretsManager(resto365BhyveConfig, 'url'),
        },
      };

    const taskImageOptions = imageOptions;

    const ddTags: string[] = Object.entries(stack.tagRecords).map(
      ([k, v]) => `${k}:${v}`,
    );
    ddTags.push(`account_id:${getEnvironment().account}`);
    ddTags.push(`aws_account:${getEnvironment().account}`);
    ddTags.push(`region:${getEnvironment().region}`);
    const logDriver: ecs.LogDriver = new ecs.FireLensLogDriver({
      options: {
        Name: 'datadog',
        Host: 'http-intake.logs.datadoghq.com',
        dd_service: `${InfraConstants.StackName}`,
        dd_source: 'ecs',
        dd_message_key: 'log',
        dd_tags: ddTags.join(','),
        TLS: 'on',
        provider: 'ecs',
      },
      secretOptions: {
        apikey: ecs.Secret.fromSecretsManager(
          secret.Secret.fromSecretNameV2(
            stack,
            `${ConfigKey.DatadogApiKeySecret}-arn`,
            ConfigKey.DatadogApiKeySecret,
          ),
        ),
      },
    });

    const loadBalancerName = `${InfraConstants.ProjectName}-lb`;
    const listenerName = `${InfraConstants.ProjectName}-listener-public`;
    const cluster = new ecs.Cluster(stack, 'EcsCluster', {
      containerInsights: true,
      vpc,
    });
    // https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies
    const sslPolicy = elbv2.SslPolicy.RECOMMENDED_TLS;

    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs_patterns-readme.html
    const loadBalancedFargateService =
      new ecsp.ApplicationMultipleTargetGroupsFargateService(
        stack,
        `${InfraConstants.ProjectName}-server`,
        {
          assignPublicIp: false,
          cluster,
          cpu: constants.Resto365.Cpu,
          memoryLimitMiB: constants.Resto365.Memory,
          desiredCount: constants.Resto365.DesiredCount,
          loadBalancers: [
            {
              name: loadBalancerName,
              domainName: apiDomain,
              domainZone: publicHostedZone,
              publicLoadBalancer: true,
              listeners: [
                {
                  name: listenerName,
                  certificate: acmCertificate,
                  protocol: elbv2.ApplicationProtocol.HTTPS,
                  sslPolicy,
                },
              ],
            },
          ],
          targetGroups: [
            {
              containerPort: apiPort,
              listener: listenerName,
            },
          ],
          enableExecuteCommand: true,
          runtimePlatform: {
            cpuArchitecture: cdk.aws_ecs.CpuArchitecture.ARM64,
            operatingSystemFamily: cdk.aws_ecs.OperatingSystemFamily.LINUX,
          },
          taskImageOptions: {
            ...taskImageOptions,
            logDriver,
          },
        },
      );

    const apiLoadBalancer = loadBalancedFargateService.loadBalancers.find(
      (lb) => lb.node.id === loadBalancerName,
    );
    if (!apiLoadBalancer) throw new Error(`${loadBalancerName} not found`);
    apiLoadBalancer.setAttribute(
      'routing.http.preserve_host_header.enabled',
      'true',
    );
    apiLoadBalancer.addRedirect();

    const apiTargetGroup = loadBalancedFargateService.targetGroups.find((tg) =>
      tg.node.id.includes(apiPort.toString()),
    );
    if (!apiTargetGroup)
      throw new Error(`${listenerName} port ${apiPort} not found`);

    apiTargetGroup.enableCookieStickiness(cdk.Duration.days(7));
    apiTargetGroup.configureHealthCheck({
      healthyHttpCodes: '200',
      path: '/health',
      port: apiPort.toString(),
    });

    const scalableTarget =
      loadBalancedFargateService.service.autoScaleTaskCount({
        minCapacity: constants.Resto365.MinCount,
        maxCapacity: constants.Resto365.MaxCount,
      });

    scalableTarget.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 50,
    });

    scalableTarget.scaleOnMemoryUtilization('MemoryScaling', {
      targetUtilizationPercent: 50,
    });

    Core.createOutput({
      identifier: 'resto365-docker-image-uri',
      value: imageAsset.imageUri,
      stack,
    });

    Core.createOutput({
      identifier: InfraConstants.ApiAlbArnExportId,
      value: apiLoadBalancer.loadBalancerArn,
      shouldExport: true,
      stack,
    });
  },
});
