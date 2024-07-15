import {
  Stacks,
  Databases,
  Vpc,
  Stack,
  Duration,
  SubnetType,
} from '@gyg/cdk-utils-v2';
import { getGeographicRegion, getEnvironmentType } from '@gyg/utils';

import { getConstants } from '../common';
import { EnvironmentType, GeographicRegion } from '@gyg/types';
import {
  CaCertificate,
  DatabaseClusterEngine,
  DatabaseClusterProps,
  AuroraMysqlEngineVersion,
} from 'aws-cdk-lib/aws-rds';

import { InfraConstants } from '../constants';

const constants = getConstants();

export function createAuroraMySql(isRotateUserSecret: boolean): void {
  if (!constants.Resto365.DatabaseConfig) {
    throw new Error(
      'DatabaseConfig is not available. Stack will not be created.',
    );
  }
  const dbConstants = constants.Resto365.DatabaseConfig;

  const stackFunc = function (stack: Stack): void {
    const auroraMySqlRdsName = InfraConstants.AuroraMySqlServerlessRdsName;
    const databaseBacktrackWindow = constants.DatabaseBacktrackWindow;

    const vpc = Vpc.getVpc(stack, 'VPC', {
      vpcName: constants.Resto365.Vpc,
    });
    const dbUserSecretRotationOptions = isRotateUserSecret
      ? { rotationPeriod: Duration.days(30) }
      : undefined;

    const prodEnv = getEnvironmentType() === EnvironmentType.Prod;
    const localEnv = getEnvironmentType() === EnvironmentType.Local;
    const region = getGeographicRegion();

    let overrides: Partial<DatabaseClusterProps>;
    if (prodEnv) {
      overrides = {
        backup: {
          retention: Duration.days(14),
        },
        cloudwatchLogsExports: ['slowquery', 'general', 'error', 'audit'],
        deletionProtection: true,
        backtrackWindow:
          databaseBacktrackWindow && region === GeographicRegion.Australia
            ? Duration.hours(databaseBacktrackWindow)
            : undefined,
      };
    } else {
      overrides = {
        backup: {
          retention: Duration.days(1),
        },
        cloudwatchLogsExports: ['slowquery', 'error'],
        deletionProtection: false,
        engine: localEnv
          ? DatabaseClusterEngine.AURORA_MYSQL
          : DatabaseClusterEngine.auroraMysql({
              version: AuroraMysqlEngineVersion.VER_3_02_0,
            }),
      };
    }

    const adminUserSecretRotationOptions = localEnv
      ? undefined
      : { rotationPeriod: Duration.days(30) };

    Databases.createRdsAuroraServerlessV2({
      name: auroraMySqlRdsName,
      dbName: 'r365',
      stackPrefix: 'resto365',
      databaseDomainName: dbConstants.DatabaseDomainName,
      databaseReadOnlyDomainName: dbConstants.DatabaseReadOnlyDomainName,
      serverlessV2MaxCapacity: dbConstants.AuroraServerlessV2MaxCapacity,
      serverlessV2MinCapacity: dbConstants.AuroraServerlessV2MinCapacity,
      vpc,
      vpcSubnetType: SubnetType.PRIVATE_ISOLATED,
      stack,
      createProxy: false,
      overrides,
      adminUserSecretRotationOptions,
      dbUserSecretRotationOptions,
      isFromLegacyInstanceProps: true,
      // Must explicitly set instance identifiers here
      readerIdentifiers: ['instance2'],
      writerIdentifier: 'instance1',
      caCertificate: CaCertificate.RDS_CA_RDS2048_G1,
      overrideClusterParameters: {
        sort_buffer_size: (1024 * 1024).toString(), // default is (1024 * 1024 * 0.25)
        time_zone: 'UTC',
      },
    });
  };

  void Stacks.createAppStack({
    stackName: 'resto365-aurora-mysql-serverless',
    stackFunc: stackFunc,
    setDefaultBhyveStackPrefix: false,
  });
}
