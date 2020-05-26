/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  // createRedirect({ fromPath: '/', toPath: '/wp-chessea/home', redirectInBrowser: true, isPermanent: true })
  // The “graphql” function allows us to run arbitrary
  // queries against the local Gatsby GraphQL schema. Think of
  // it like the site has a built-in database constructed
  // from the fetched data that you can run queries against.
  const result = await graphql(`
    {
        allWordpressPage {
          edges {
            node {
              featured_media {
                localFile {
                  base
                }
                slug
                title
              }
              excerpt
              slug
              template
              content
              acf {
                remove
                keuzeja
                keuzenee
                link_1
                link_2
                vraag
                text_2
                vraag_1
                vraag_2
                voorwerp {
                  localFile {
                    base
                  }
                  slug
                }
              }
            }
          }
        }
      }
  `)

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Access query results via object destructuring
  const { allWordpressPage, allWordpressPost } = result.data

  // Create Page pages.
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const noItemTemplate = path.resolve(`./src/templates/no-item.js`)
  const resultTemplate = path.resolve(`./src/templates/result.js`)

  // We want to create a detailed page for each page node.
  // The path field contains the relative original WordPress link
  // and we use it for the slug to preserve url structure.
  // The Page ID is prefixed with 'PAGE_'
  allWordpressPage.edges.forEach(edge => {

    // Gatsby uses Redux to manage its internal state.
    // Plugins and sites can use functions like "createPage"
    // to interact with Gatsby.
    createPage({
      // Each page is required to have a `path` as well
      // as a template component. The `context` is
      // optional but is often necessary so the template
      // can query data specific to each page.
      path: `/${edge.node.slug}`,
      component: slash(edge.node.template === 'result.php' ? resultTemplate :
                      edge.node.template === 'no-item.php' ? noItemTemplate
                      : pageTemplate),
      context: {
        content: edge.node.content,
        template: edge.node.template,
        excerpt: edge.node.excerpt,
        image: edge.node.featured_media.localFile.base,
        link1: edge.node.acf.link_1,
        link2: edge.node.acf.link_2,
        text2: edge.node.acf.text_2,
        vraag: edge.node.acf.vraag,
        vraag1: edge.node.acf.vraag_1,
        vraag2: edge.node.acf.vraag_2,
        remove: edge.node.acf.remove,
        slug: edge.node.slug,
        inventoryImg: edge.node.acf.voorwerp.localFile.base,
        item: edge.node.acf.voorwerp.slug,
        question: edge.node.acf.question,
        choice1: edge.node.acf.keuzeja,
        choice2: edge.node.acf.keuzenee,
      },
    })
  })


}
