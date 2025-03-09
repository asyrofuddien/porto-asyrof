import { gql } from "@apollo/client";
import createApolloClient from "../lib/apolloClient";

export async function GetAllProjects() {
    const client = createApolloClient();
    const { data } = await client.query({
        query: gql`
          query GetAllProjects {
            _id
            description
            image
            link
            project_name
          }
        `,
    });

    return {
        props: {
            projects: data.slice(0, 4),
        },
    };
}