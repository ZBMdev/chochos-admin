import {RouteLocationNormalized, RouteRecordNormalized} from 'vue-router';
const APP_TITLE = "Chochos Admin";
import { intersection } from 'lodash';
// import Role from '@/models/Role';
import { AdminData } from '@/types/admin';
import getUser from '@/utils/users';

export const setPageTitle = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {

  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle: RouteRecordNormalized | undefined = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  // eslint-disable-next-line
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = `${nearestWithTitle.meta.title} | ${APP_TITLE}`;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) => {
    if (el.parentNode) { return el.parentNode.removeChild(el); }
    return el;
  });

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return;

  // Todo(Lekan): Emmanuel should investigate the reason why this lines bellow are needed
  // Turn the meta tag definitions into actual elements in the head.
  /*nearestWithMeta.metaTags.map((tagDef: Record<string, string>) => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
    // Add the meta tags to the document head.
    .forEach((tag: any) => document.head.appendChild(tag));*/
  return
}

export const hasAccess = async (permit: string[]) => {
    if (!permit) { return true; }
    const user = await getUser();
    if (!user) { return false; }
    /* const pesmissionsData = (user as AdminData).role.resources;
    const permissions = pesmissionsData.map((resource) => Role.resourceToString(resource)) 
    const matchingPermissions = intersection(permit, permissions)
    // console.log(permit, permissions, matchingPermissions)
    return matchingPermissions.length > 0 */
 
}
