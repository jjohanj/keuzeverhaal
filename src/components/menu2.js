import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'

import BackgroundImage from 'gatsby-background-image'

const BackgroundSection = (props) => (
  // <StaticQuery
  //   query={graphql`
  //     query {
  //       desktop: file(relativePath: { eq: "flowers.jpg" }) {
  //         childImageSharp {
  //           fluid(quality: 90, maxWidth: 1920) {
  //             ...GatsbyImageSharpFluid_withWebp
  //           }
  //         }
  //       }
  //     }
  //   `}
  //   render={data => {
  //     // Set ImageData.
  //     const imageData = data.desktop.childImageSharp.fluid
  //     return (
  //       <BackgroundImage
  //         Tag="div"
  //         className="back"
  //         fluid={imageData}
  //         backgroundColor={`#040e13`}
  //       >
  //       <div className="overlay"> </div>
  //       {console.log(imageData)}
  //       </BackgroundImage>
  //     )
  //   }}
  // />

  <StaticQuery
    query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
                originalName
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.allImageSharp.edges.find(
        edge => edge.node.fluid.originalName === props.background
      )
      if (!image) {
        return null
      }
      return (

        <BackgroundImage
          Tag="div"
          className="back"
          fluid={image.node.fluid}
          backgroundColor={`#fff`}
        >
        <div className="overlay">
       </div>

        </BackgroundImage>
      )
    }}
  />
)


export default BackgroundSection
