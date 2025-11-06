import { AbilityBuilder, Ability } from '@casl/ability';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete' | 'approve';
export type Subjects = 'Request' | 'Workflow' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

export function defineAbilityFor(role: string) {
  const { can, build } = new AbilityBuilder<AppAbility>(Ability as any);

  if (role === 'engineer') {
    can('read', 'Request');
    can('approve', 'Workflow');
    can('update', 'Request');
  } else if (role === 'reviewer') {
    can('read', 'Request');
    can('approve', 'Workflow');
  } else {
    can('create', 'Request');
    can('read', 'Request');
  }

  return build();
}
