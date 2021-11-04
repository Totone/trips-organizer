import { 
    // defaultNS, 
    resources 
} from "./i18n"

declare module "react-i18next" {
    type DefaultResources = typeof resources["fr"]
    interface Resouces extends DefaultResources {}
    
    /** New version but error in VSCode `ts2769` */
    // interface CustomTypeOptions {
    //     defaultNS: typeof defaultNS
    //     resources: typeof resources["fr"]
    // }
}