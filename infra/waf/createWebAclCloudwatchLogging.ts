import { Cloudwatch, Waf } from '@gyg/cdk-utils-v2';
import {
  getEnvironment,
  getEnvironmentType,
  getGeographicRegion,
} from '@gyg/utils';
import { Stack } from 'aws-cdk-lib';
import { PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Function } from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as destinations from 'aws-cdk-lib/aws-logs-destinations';
import { CfnLoggingConfiguration } from 'aws-cdk-lib/aws-wafv2';
import { getConstants } from '../common';
import { InfraConstants } from '../constants';

export function createWebAclCloudwatchLogging(
  stack: Stack,
  wafAclAttrArn: string,
): CfnLoggingConfiguration {
  const environment = getEnvironment();
  const logGroupName = `aws-waf-logs-${InfraConstants.WafName}-${getGeographicRegion()}`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const logGroup = Cloudwatch.createCloudwatchLogGroup({
    stack,
    logGroupId: 'WebAclLogGroup',
    logGroupName: logGroupName,
  });
  const env = getEnvironmentType();
  const awsAccount = environment.account;
  const awsRegion = environment.region;

  if (!awsAccount)
    throw new Error(`Undefined AWS Account in '${env}' environment`);

  // eslint-disable-next-line prettier/prettier
  const logDestination = `arn:aws:logs:${awsRegion}:${awsAccount}:log-group:${logGroupName}`;

  // Add Cloudwatch resource policy
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  logGroup.addToResourcePolicy(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    new PolicyStatement({
      actions: ['logs:CreateLogStream', 'logs:PutLogEvents'],
      principals: [new ServicePrincipal('delivery.logs.amazonaws.com')],
      resources: [logDestination],
    }),
  );

  const datadogFunction = Function.fromFunctionArn(
    stack,
    'datadog-forwarder',
    getConstants().DatadogForwarderArn,
  );
  new logs.SubscriptionFilter(stack, 'Subscription', {
    logGroup,
    destination: new destinations.LambdaDestination(datadogFunction),
    filterPattern: logs.FilterPattern.allEvents(),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return Waf.createWafLoggingConfiguration({
    stack,
    logDestinationConfigs: [logDestination],
    resourceArn: wafAclAttrArn,
    loggingFilter: {
      DefaultBehavior: 'DROP',
      Filters: [
        {
          Behavior: 'KEEP',
          Conditions: [
            {
              ActionCondition: {
                Action: 'BLOCK',
              },
            },
            {
              ActionCondition: {
                Action: 'COUNT',
              },
            },
          ],
          Requirement: 'MEETS_ANY',
        },
      ],
    },
  });
}
