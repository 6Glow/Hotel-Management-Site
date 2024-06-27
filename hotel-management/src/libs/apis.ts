import { Room } from "@/app/models/room";
import sanityClient from "./sanity";
import * as query from "./sanityQueries";

export async function getFeaturedRoom() {
        const result = await sanityClient.fetch<Room>(
          query.getFeaturedRoomQuery, 
          {}, 
          {cache : 'no-cache'}
      );

      return result;
}