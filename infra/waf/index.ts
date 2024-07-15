import { Stacks, Waf } from '@gyg/cdk-utils-v2';
import { Fn, Stack } from 'aws-cdk-lib';
import { CfnIPSet, CfnWebACL } from 'aws-cdk-lib/aws-wafv2';

import { matchApiHostStatement, signinUrlByteMatchStatement } from './common';

import { getConstants } from '../common';

import { createWebAclCloudwatchLogging } from './createWebAclCloudwatchLogging';

import { InfraConstants } from '../constants';

const constants = getConstants();

const scope = Waf.WafScope.Regional;

const countryCodes: Waf.WafCountryCode[] = [
  Waf.WafCountryCode.Australia,
  Waf.WafCountryCode.UnitedStates,
  Waf.WafCountryCode.India,
  Waf.WafCountryCode.Philippines,
];

const whitelistIpAddresses: string[] = [];
whitelistIpAddresses.push(
  '147.161.214.0/23',
  '165.225.114.0/23',
  '165.225.226.0/23',
  '165.225.232.0/23',
); // zscaler office
whitelistIpAddresses.push(
  '202.81.5.197/32',
  '43.245.169.181/32',
  '67.227.194.4/32',
); // GYG Sydney and QLD offices
whitelistIpAddresses.push('3.24.101.62/32', '3.139.165.33/32'); // AWS Client VPN internet AU / US

export function createWaf(wafName: string): void {
  const stackFunc = function (stack: Stack): void {
    const rules = [];
    let priority = 0;

    const allowIpSet = Waf.createIpSet({
      stack,
      name: `Whitelisted_IPs_${wafName}`,
      ipv4Address: whitelistIpAddresses,
      scope,
    });

    // WCU are provided here as a convenience
    // WCU's are the Web ACL units a rule consumes, how much determines which price band we are in.
    // The total WCUs for a web ACL can't exceed 5000. Using over 1500 WCUs affects your costs.

    // rate limiting before allow list to deal with run away requests coming from GYG
    rules.push(generalRateLimiting(priority++)); // WCU: 2
    rules.push(siginRateLimiting(signinUrlByteMatchStatement, priority++)); // WCU: 12

    // allowlist before blocks, but after rate limiting - COUNT mode
    rules.push(allowList(allowIpSet, priority++)); // WCU: 1

    // general maintenance - blocks all requests
    // uncomment to enable
    // rules.push(generalMaintenanceRule(priority++)) // WCU: 32

    // custom blocks
    rules.push(blockTrafficNotInWhitelist(allowIpSet, priority++));
    rules.push(externalGeoRule(priority++)); // WCU: 1

    // AWS managed rules
    rules.push(awsKnownBadInputsRule(priority++)); // WCU: 200
    rules.push(awsSqliRule(priority++)); // WCU: 200
    rules.push(awsCommonRules(priority++)); // WCU: 700
    rules.push(awsWafBotControlSignin(signinUrlByteMatchStatement, priority++)); // WCU: 80
    rules.push(requireTokenForSignin(priority++)); // WCU: 38

    const wafAcl = Waf.createWaf({
      stack,
      wafName,
      rules,
      tokenDomains: constants.PublicApiCloudfrontWafTokenDomains,
      resourceArn: Fn.importValue(InfraConstants.ApiAlbArnExportId),
    });

    // WebACL Cloudwatch Logging Configuration
    createWebAclCloudwatchLogging(stack, wafAcl.attrArn);
  };

  // Creating the application stack, since this is a cloudfront WAF, it will need to be deployed in us-east-1
  void Stacks.createAppStack({
    stackName: wafName,
    stackFunc,
    setDefaultBhyveStackPrefix: false,
  });
}

createWaf(InfraConstants.WafName);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generalMaintenanceRule(priority: number): CfnWebACL.RuleProperty {
  return Waf.createWafRule({
    action: Waf.WafRuleAction.Block,
    name: 'GeneralMaintenanceRule',
    priority,
    statement: {
      orStatement: {
        statements: [
          { byteMatchStatement: matchApiHostStatement },
          { byteMatchStatement: signinUrlByteMatchStatement },
        ],
      },
    },
    customResponseMaintenance: true,
    customResponseCode: 503,
  });
}

function awsWafBotControlSignin(
  siginByteMatchStatement: CfnWebACL.ByteMatchStatementProperty,
  priority: number,
): CfnWebACL.RuleProperty {
  return Waf.createManagedRuleGroupRule({
    overrideAction: Waf.WafOverrideAction.Count,
    priority,
    name: Waf.WafAwsManagedRule.AwsManagedRulesBotControlRuleSet,
    customResponseCode: 401,
    managedRuleGroupConfigs: [
      // https://docs.aws.amazon.com/waf/latest/developerguide/waf-bot-control-rg-using.html
      // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-wafv2-webacl-awsmanagedrulesbotcontrolruleset.html
      {
        awsManagedRulesBotControlRuleSet: {
          inspectionLevel: 'TARGETED',
        },
      },
    ],
    scopeDownStatement: {
      byteMatchStatement: siginByteMatchStatement,
    },
  });
}

function requireTokenForSignin(priority: number): CfnWebACL.RuleProperty {
  const tokenRejectedLabelMatchStatement: CfnWebACL.LabelMatchStatementProperty =
    {
      scope: 'LABEL',
      key: 'awswaf:managed:token:rejected',
    };
  const tokenAbsentLabelMatchStatement: CfnWebACL.LabelMatchStatementProperty =
    {
      scope: 'LABEL',
      key: 'awswaf:managed:token:absent',
    };
  const tokenMatchStatement: CfnWebACL.OrStatementProperty = {
    statements: [
      { labelMatchStatement: tokenAbsentLabelMatchStatement },
      { labelMatchStatement: tokenRejectedLabelMatchStatement },
    ],
  };

  return Waf.createWafRule({
    action: Waf.WafRuleAction.Count,
    name: 'RequireTokenForSignin',
    priority,
    statement: {
      andStatement: {
        statements: [
          { byteMatchStatement: signinUrlByteMatchStatement },
          { orStatement: tokenMatchStatement },
        ],
      },
    },
  });
}

function awsCommonRules(priority: number): CfnWebACL.RuleProperty {
  return Waf.createManagedRuleGroupRule({
    overrideAction: Waf.WafOverrideAction.None,
    priority,
    name: Waf.WafAwsManagedRule.AwsManagedRulesCommonRuleSet,
    /**
     * https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-list.html
     */
    excludedRuleNames: [
      'EC2MetaDataSSRF_BODY',
      'GenericRFI_BODY',
      'GenericRFI_QUERYARGUMENTS',
      'SizeRestrictions_BODY',
      'EC2MetaDataSSRF_QUERYARGUMENTS',
    ],
  });
}

function externalGeoRule(priority: number): CfnWebACL.RuleProperty {
  return Waf.createGeoNotMatchRule({
    action: Waf.WafRuleAction.Block,
    name: 'GeoNotMatchRule',
    priority,
    countryCodes: countryCodes,
  });
}

function generalRateLimiting(priority: number): CfnWebACL.RuleProperty {
  // WAF rate limit determined in https://guzman.atlassian.net/browse/BHPL-636
  return Waf.createRateBasedRule({
    action: Waf.WafRuleAction.Block,
    name: 'RateBasedRule',
    priority,
    limit: 800,
    customResponseCode: 403,
  });
}

function siginRateLimiting(
  rateSignInByteMatchStatement: CfnWebACL.ByteMatchStatementProperty,
  priority: number,
): CfnWebACL.RuleProperty {
  return Waf.createRateBasedRule({
    action: Waf.WafRuleAction.Block,
    name: 'SignInRateBasedRule',
    priority,
    limit: 100,
    scopeDownStatement: {
      byteMatchStatement: rateSignInByteMatchStatement,
    },
    customResponseCode: 401,
  });
}

function awsSqliRule(priority: number): CfnWebACL.RuleProperty {
  return Waf.createManagedRuleGroupRule({
    overrideAction: Waf.WafOverrideAction.None,
    priority,
    name: Waf.WafAwsManagedRule.AwsManagedRulesSqliRuleSet,
  });
}

function awsKnownBadInputsRule(priority: number): CfnWebACL.RuleProperty {
  return Waf.createManagedRuleGroupRule({
    overrideAction: Waf.WafOverrideAction.None,
    priority,
    name: Waf.WafAwsManagedRule.AwsManagedRulesKnownBadInputsRuleSet,
  });
}

function blockTrafficNotInWhitelist(
  ipSet: CfnIPSet,
  priority: number,
): CfnWebACL.RuleProperty {
  return Waf.createIpSetReferenceRule({
    name: 'Block_IPs_Not_Whitelisted',
    ipSetArn: ipSet.attrArn,
    priority,
    action: Waf.WafRuleAction.Count,
    wrapStatementFunc: Waf.notWrapStatementFunc,
    customResponseCode: 401,
  });
}

function allowList(
  staticIpSet: CfnIPSet,
  priority: number,
): CfnWebACL.RuleProperty {
  return Waf.createIpSetReferenceRule({
    name: 'AllowWhitelistedIPs',
    ipSetArn: staticIpSet.attrArn,
    priority,
    action: Waf.WafRuleAction.Count,
  });
}
