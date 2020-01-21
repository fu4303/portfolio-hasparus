/** @jsx jsx */
import { graphql, Link, useStaticQuery } from "gatsby";
import { Styled as s, jsx } from "theme-ui";

import { BlogPostsQuery } from "./__generated__/BlogPostsQuery";
import { Header, Root } from "../components";
import { PostDetails } from "../components/PostDetails";
import { Seo } from "../components/Seo";
import { Footer } from "../components/Footer";
import { PostsListItem } from "../components/PostsListItem";

const WritingPage = () => {
  const { allMdx } = useStaticQuery<BlogPostsQuery>(graphql`
    query BlogPostsQuery {
      allMdx(
        filter: {
          fields: { isHidden: { ne: true }, route: { glob: "/*" } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        nodes {
          frontmatter {
            title
            spoiler
            date
          }
          fields {
            route
            readingTime
          }
        }
      }
    }
  `);

  return (
    <Root>
      <Seo title="writing" />
      <Header />
      <main>
        {allMdx.nodes.map((node, i) => {
          const { frontmatter, fields } = node!;
          const { title, spoiler, date } = frontmatter || {};

          return (
            <PostsListItem key={i}>
              <PostsListItem.Header>
                <PostsListItem.Heading title={title!} fields={fields!} />
                <PostDetails
                  date={date}
                  readingTime={fields!.readingTime}
                />
              </PostsListItem.Header>
              <PostsListItem.Spoiler>{spoiler}</PostsListItem.Spoiler>
            </PostsListItem>
          );
        })}
      </main>
      <Footer />
    </Root>
  );
};

// eslint-disable-next-line import/no-default-export
export default WritingPage;