import { setupURLPolyfill } from 'react-native-url-polyfill';

import {createClient} from "@sanity/client";
import imageUrlBuilder  from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

setupURLPolyfill();

const client = createClient({
    projectId: '7dq0uc4q',
  dataset: 'production',
    useCdn:true,apiVersion:"2023-02-22"
})

const builder = imageUrlBuilder(client);
export const urlFor = (source:SanityImageSource)=>builder.image(source);

export default client;