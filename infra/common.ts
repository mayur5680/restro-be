import { Route53, Stacks } from '@gyg/cdk-utils-v2';
import * as utils from '@gyg/utils';
import { Resto365Constant, resto365PlatformConstants } from './constants';

export function getPublicHostedZone(stack: Stacks.AppStack) {
  const constants = utils.getConstants();

  return Route53.getHostedZone({
    hostedZoneId: constants.PublicHostedZoneId,
    hostedZoneName: constants.PublicHostedZoneName,
    identifier: 'publicZone',
    stack,
  });
}

export function getPrivateHostedZone(stack: Stacks.AppStack) {
  const constants = utils.getConstants();

  return Route53.getHostedZone({
    hostedZoneId: constants.PrivateHostedZoneId,
    hostedZoneName: constants.PrivateHostedZoneName,
    identifier: 'privateZone',
    stack,
  });
}

export type Resto365EnvironmentConstant = utils.EnvironmentConstant & {
  Resto365: Resto365Constant;
};
let constants: Resto365EnvironmentConstant;

export function getConstants(): Resto365EnvironmentConstant {
  if (constants) return constants;

  const platform = utils.getPlatformType();
  const region = utils.getGeographicRegion();
  const env = utils.getEnvironmentType();
  const resto365PlatformConstant =
    resto365PlatformConstants[platform]?.[region]?.[env];
  if (!resto365PlatformConstant) {
    throw new Error(
      `There is no Resto365 constants for this environment: ${platform}/${region}/${env}`,
    );
  }
  constants = {
    ...utils.getConstants(),
    ...{ Resto365: resto365PlatformConstant },
  };
  return constants;
}
