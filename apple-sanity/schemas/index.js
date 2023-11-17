import product from "./product"
import category from "./category"
import blockContent from "./blockContent"
import { account, user } from "next-auth-sanity/schemas"

export const schemaTypes = [product, category, blockContent, user, account]
