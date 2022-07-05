import data from "./data"
// import { testApi } from "@/api"
let cityListData = null

export default async function() {
  if (cityListData) {
    return cityListData
  }
  // const { data } = await testApi.queryAdmdvsTree()
  cityListData = data

  return cityListData || []
}
