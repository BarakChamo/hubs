/*
  Inject custom functionality into the Hubs scene and NAF schemas.
*/

import configs from "./utils/configs";

const hubsConfigsUri = `${configs.INJECT_CONTENT_URI}/configs`;
const hubsScriptsUri = `${configs.INJECT_CONTENT_URI}/scripts`;

const injectScripts = async hub_id => {
  //get the current hub_id and construct a url

  const url = `${hubsConfigsUri}/${hub_id}.json`;

  //fetch the url with a get method which will return scripts to inject
  const response = await fetch(url);
  const data = await response.json();

  for (let i = 0; i < data.scripts.length; i++) {
    const scriptUrl = `${hubsScriptsUri}/${data.scripts[i]}`;

    //inject some scripts based on the returned array of urls
    const newScript = document.createElement("script");
    newScript.type = "text/javascript";

    const srcAt = document.createAttribute("src");
    srcAt.value = scriptUrl;

    newScript.setAttributeNode(srcAt);
    document.body.appendChild(newScript);
  }
};

export const injectContent = async (hub, hubChannel) => {
  console.log(hub, hubChannel);
  try {
    injectScripts(hub.hub_id);
  } catch (error) {
    console.log(error);
  }
};
