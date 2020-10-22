/** @jsx jsx */
import { graphql, useStaticQuery } from "gatsby";
import { jsx, Styled as s } from "theme-ui";

import { PostDetails } from "../features/blog/PostDetails";
import { PostsListItem } from "../features/blog/PostsListItem";
import { Seo } from "../features/seo/Seo";
import { PageLayout } from "../layouts/PageLayout";
import { ListPageHeading } from "../lib/reusable-ui/ListPageHeading";
import { SpeakingRaportsQuery } from "./__generated__/SpeakingRaportsQuery";

const SpeakingPage = () => {
  const { allMdx } = useStaticQuery<GatsbyTypes.SpeakingRaportsQueryQuery>(graphql`
    query SpeakingRaportsQuery {
      allMdx(
        filter: {
          fields: { isHidden: { ne: true }, route: { glob: "/speaking/*" } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        nodes {
          frontmatter {
            title
            spoiler
            date
            venues {
              name
              link
            }
          }
          fields {
            route
          }
        }
      }
    }
  `);

  return (
    <PageLayout>
      <Seo title="speaking" />
      <ListPageHeading>Speaking</ListPageHeading>
      <main>
        {allMdx.nodes.map((node, i) => {
          const { frontmatter, fields } = node!;
          const { title, spoiler, date, venues } = frontmatter || {};

          return (
            <PostsListItem key={i}>
              <PostsListItem.Header>
                <PostsListItem.Heading title={title!} fields={fields!} />
                <PostDetails date={date} venues={venues} />
              </PostsListItem.Header>
              <PostsListItem.Spoiler>{spoiler}</PostsListItem.Spoiler>
            </PostsListItem>
          );
        })}
      </main>
    </PageLayout>
  );
};

export default SpeakingPage;
