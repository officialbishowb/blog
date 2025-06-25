import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '933c39f8eb24cf61671f6c577eb02998b209497b', queries,  });
export default client;
  