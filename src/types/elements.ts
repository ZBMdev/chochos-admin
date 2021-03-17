
export interface MenuItem {
    label: string; // Text of the item.
    icon: string; // Icon of the item.
    to: string; // Path of the route.
    badge: string;
    command: (event: unknown) => void; // Callback to execute when item is clicked.
    url: string; // External link to navigate when item is clicked.
    items: Partial<MenuItem>[]; // An array of children menuitems.
    disabled: boolean; // When set as true, disables the menuitem.
    visible: boolean; // A boolean or a function to return a boolean to specify if the item is visible.
    target: string; // Defines the item as a separator.
    separator: boolean; // default: 
    style: Record<string, unknown>; // Inline style of the menuitem.
    class: string; // Style class of the menuitem.
}