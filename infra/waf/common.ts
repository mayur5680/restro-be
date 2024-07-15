import { CfnWebACL } from 'aws-cdk-lib/aws-wafv2';
import { getConstants } from '../common';
import { Waf } from '@gyg/cdk-utils-v2';

export const noTextTransformations: CfnWebACL.TextTransformationProperty[] = [
  {
    priority: 0,
    type: 'NONE',
  },
];

export const textTransformationsNormalizePath: CfnWebACL.TextTransformationProperty[] =
  [
    {
      priority: 0,
      type: 'URL_DECODE',
    },
    {
      priority: 1,
      type: 'NORMALIZE_PATH',
    },
  ];

export function getNonWhitelistedCountriesStatement(
  countryCodes: Waf.WafCountryCode[],
): CfnWebACL.NotStatementProperty {
  const geoMatchStatement: CfnWebACL.NotStatementProperty = {
    statement: {
      geoMatchStatement: {
        countryCodes,
      },
    },
  };
  return geoMatchStatement;
}

export function getIpSetReferenceNotStatement(
  ipSetArn: string,
): CfnWebACL.NotStatementProperty {
  const ipSetReferenceStatement: CfnWebACL.IPSetReferenceStatementProperty = {
    arn: ipSetArn,
  };
  const statement: CfnWebACL.StatementProperty = {
    ipSetReferenceStatement,
  };
  const ipSetNotStatement: CfnWebACL.NotStatementProperty = {
    statement: statement,
  };
  return ipSetNotStatement;
}

export type CreateSpecificUrlStatementArgs = {
  url: string;
  countryCodes: Waf.WafCountryCode[];
  customStatements?: CfnWebACL.StatementProperty[];
};

export function createGeoBlockSpecificUrlStatement(
  args: CreateSpecificUrlStatementArgs,
): CfnWebACL.StatementProperty {
  const { url, countryCodes, customStatements } = args;
  const specificUrlByteMatchStatement: CfnWebACL.ByteMatchStatementProperty = {
    searchString: `/${url}`,
    textTransformations: textTransformationsNormalizePath,
    positionalConstraint: 'STARTS_WITH',
    fieldToMatch: { uriPath: {} },
  };
  const statements: CfnWebACL.StatementProperty[] = [
    { notStatement: getNonWhitelistedCountriesStatement(countryCodes) },
    { byteMatchStatement: specificUrlByteMatchStatement },
  ];
  customStatements?.forEach((s) => statements.push(s));

  const andStatement: CfnWebACL.AndStatementProperty = {
    statements: statements,
  };
  const statement: CfnWebACL.StatementProperty = {
    andStatement: andStatement,
  };
  return statement;
}

export function andWrapperStatement(
  statementToWrap: CfnWebACL.StatementProperty,
): CfnWebACL.StatementProperty {
  const andStatement: CfnWebACL.AndStatementProperty = {
    statements: [statementToWrap],
  };
  const statement: CfnWebACL.StatementProperty = {
    andStatement,
  };
  return statement;
}

export function notWrapperStatement(
  statementToWrap: CfnWebACL.StatementProperty,
): CfnWebACL.StatementProperty {
  const notStatement: CfnWebACL.NotStatementProperty = {
    statement: statementToWrap,
  };
  const statement: CfnWebACL.StatementProperty = {
    notStatement,
  };
  return statement;
}

export const signinUrlByteMatchStatement: CfnWebACL.ByteMatchStatementProperty =
  {
    searchString: `/callback`,
    textTransformations: textTransformationsNormalizePath,
    positionalConstraint: 'STARTS_WITH',
    fieldToMatch: { uriPath: {} },
  };

export const matchApiHostStatement: CfnWebACL.ByteMatchStatementProperty = {
  searchString: `${getConstants().Resto365.ApiDomainName}`,
  textTransformations: noTextTransformations,
  positionalConstraint: 'CONTAINS',
  fieldToMatch: { singleHeader: { name: 'host' } },
};
