export type Action = 'read' | 'update' | 'create' | 'delete';
export type Subject =
  | 'user-management'
  | 'restaurant'
  | 'restaurant-licence'
  | 'guest-experience'
  | 'marketing'
  | 'operations'
  | 'menu'
  | 'faq'
  | 'equipment';
export type Permissions = { [index in Subject]?: Action[] };
export type PermissionsMap = Record<string, Permissions>;
