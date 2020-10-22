/** @jsx jsx */

import { graphql, Link, useStaticQuery } from "gatsby";
import { jsx, Styled as s } from "theme-ui";

import { Seo } from "../features/seo/Seo";
import { theme } from "../gatsby-plugin-theme-ui";
import { PageLayout } from "../layouts/PageLayout";
import { NotesIndexQuery } from "./__generated__/NotesIndexQuery";

const NotesIndexPage = () => {
  const { allFile } = useStaticQuery<NotesIndexQuery>(graphql`
    query NotesIndexQuery {
      allFile(
        filter: {
          childMdx: { fields: { isHidden: { eq: false } } }
          sourceInstanceName: { eq: "notes" }
        }
      ) {
        nodes {
          childMdx {
            fields {
              title
              route
              history {
                entries {
                  subject
                  authorDate
                  abbreviatedCommit
                }
                url
              }
              socialImage {
                childImageSharp {
                  original {
                    width
                    height
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <PageLayout>
      <Seo title="notes" />
      <main sx={{ mt: 6 }}>
        <s.p>
          These are my notes — short pieces of markdown focused on one
          topic, connected together with bidirectional links. They're all
          work-in-progress and unfinished, and that's okay. You can get a
          sneak peek of my thoughts 😉
        </s.p>
        <s.p>Enjoy the adventure!</s.p>
        <s.p>
          There's going to be an awesome Roam-style graph of all of these
          notes here in the future, but have a list for now.
        </s.p>
        <ul>
          {allFile.nodes.map((node, i) => {
            const { title, route } = node.childMdx!.fields!;

            return (
              <li key={i}>
                <Link sx={theme.styles.a} to={route}>
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </PageLayout>
  );
};

export default NotesIndexPage;
