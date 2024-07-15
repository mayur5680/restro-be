import {
  EcsCpuType,
  EcsMemoryType,
  PlatformConstantProfile,
  AuroraCapacityUnit,
} from '@gyg/utils';

export enum InfraConstants {
  ProjectName = 'Resto365',
  StackName = 'resto365-be',
  WafName = 'resto365-be-waf',
  DomainPrefix = 'resto365',
  VpnCidr = '172.16.0.0/20', // transit gateway
  AuroraMySqlServerlessRdsName = 'aurora-mysql-serverless-cluster',
  ApiAlbArnExportId = 'resto365-be-alb-arn',
}

export type Resto365DatabaseConfig = {
  AuroraServerlessV2MinCapacity: AuroraCapacityUnit;
  AuroraServerlessV2MaxCapacity: AuroraCapacityUnit;
  DatabaseDomainName: string;
  DatabaseReadOnlyDomainName: string;
};

export type Resto365Constant = {
  Cpu?: EcsCpuType;
  Memory?: EcsMemoryType;
  DesiredCount?: number;
  MinCount?: number;
  MaxCount?: number;
  DomainName: string;
  ApiDomainName: string;
  DatabaseConfig?: Resto365DatabaseConfig;
  Vpc: string;
  SecretsNameBhyveDb: string;
  SecretsNameResto365Db: string;
};

export const resto365PlatformConstants: Partial<
  PlatformConstantProfile<Resto365Constant>
> = {
  ops: {
    australia: {
      test: {
        DesiredCount: 1,
        MinCount: 1,
        MaxCount: 2,
        Cpu: EcsCpuType.vCPU_1,
        Memory: EcsMemoryType.GB_2,
        DomainName: 'resto365.test.ops.gyg.com.au',
        ApiDomainName: 'api.resto365.test.ops.gyg.com.au',
        DatabaseConfig: {
          AuroraServerlessV2MinCapacity: AuroraCapacityUnit.ACU_1,
          AuroraServerlessV2MaxCapacity: AuroraCapacityUnit.ACU_5,
          DatabaseDomainName: 'db.resto365.test.ops.gyg.com.au',
          DatabaseReadOnlyDomainName: 'db-ro.resto365.test.ops.gyg.com.au',
        },
        SecretsNameBhyveDb: 'r365/db/credentials',
        SecretsNameResto365Db:
          'resto365-aurora-mysql-serverless-cluster-user-pw',
        Vpc: 'Ops_Test_VPC',
      },
      prod: {
        DesiredCount: 1,
        MinCount: 2,
        MaxCount: 10,
        Cpu: EcsCpuType.vCPU_1,
        Memory: EcsMemoryType.GB_3,
        DomainName: 'resto365.prod.ops.gyg.com.au',
        ApiDomainName: 'api.resto365.prod.ops.gyg.com.au',
        DatabaseConfig: {
          AuroraServerlessV2MinCapacity: AuroraCapacityUnit.ACU_1,
          AuroraServerlessV2MaxCapacity: AuroraCapacityUnit.ACU_10,
          DatabaseDomainName: 'db.resto365.prod.ops.gyg.com.au',
          DatabaseReadOnlyDomainName: 'db-ro.resto365.prod.ops.gyg.com.au',
        },
        SecretsNameBhyveDb: 'r365/db/credentials',
        SecretsNameResto365Db:
          'resto365-aurora-mysql-serverless-cluster-user-pw',
        Vpc: 'Ops_Prod_VPC',
      },
    },
    usa: {
      test: {
        DesiredCount: 1,
        MinCount: 1,
        MaxCount: 2,
        Cpu: EcsCpuType.vCPU_1,
        Memory: EcsMemoryType.GB_2,
        DomainName: 'resto365.test.ops.guzmanygomez.com',
        ApiDomainName: 'api.resto365.test.ops.guzmanygomez.com',
        SecretsNameBhyveDb:
          'app-credentials/test/bhyve-aurora-mysql-serverless-cluster/gyg/resto365',
        SecretsNameResto365Db: 'r365/resto365_au_db/credentials',
        Vpc: 'Ops_Test_VPC',
      },
      prod: {
        DesiredCount: 1,
        MinCount: 2,
        MaxCount: 10,
        Cpu: EcsCpuType.vCPU_1,
        Memory: EcsMemoryType.GB_3,
        DomainName: 'resto365.prod.ops.guzmanygomez.com',
        ApiDomainName: 'api.resto365.prod.ops.guzmanygomez.com',
        SecretsNameBhyveDb: 'r365/bhyve_usa_db/credentials',
        SecretsNameResto365Db: 'r365/resto365_au_db/credentials',
        Vpc: 'Ops_Prod_VPC',
      },
    },
  },
};
