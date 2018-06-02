import React, { Component, Fragment } from 'react'

import { Link } from 'react-router-dom'

import gql from 'graphql-tag.macro'

import Loader from '../common/Loader'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap'

class LinkItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.nodeId !== nextProps.nodeId
  }

  bottomNavigation = this.props.userId &&
  this.props.author &&
  this.props.userId === this.props.author.id ? (
    <Link to={`/links/${this.props.id}`}>Edit</Link>
  ) : null

  render() {
    const {
      loading = false,
      userId,
      title,
      way,
      author = {},
      preview,
      imageUrl
    } = this.props
    if (loading)
      return (
        <div className="col-lg-12">
          <h2>
            <Loader />
          </h2>
          <div className={'row mb-2'} />
        </div>
      )
    return (
      <Fragment>
        <Card>
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>
              {author.fullName && (
                <div>
                  posted by
                  <Link to={`/persons/${author.id}`}>{` ${
                    author.fullName
                  }`}</Link>
                </div>
              )}
            </CardSubtitle>
            <CardText>
              {preview}
              <a href={way}> Read more</a>
            </CardText>
            <CardText>
              <small className="text-muted">Last updated 3 mins ago</small>
            </CardText>
            {userId === author.id && (
              <Link to={`/links/${this.props.id}`}>Edit</Link>
            )}
          </CardBody>
          {imageUrl && (
            <CardImg
              // onLoad={measure}
              bottom
              width="100%"
              // height={imageUrl ? null : 0}
              src={imageUrl}
              alt="Card image cap"
            />
          )}
        </Card>
        <div className={'row mb-2'} />
      </Fragment>
    )
  }
}

LinkItem.fragments = {
  link: gql`
    fragment Link on Link {
      id
      nodeId
      way
      title
      preview
      author: personByPersonId {
        id
        fullName
      }
      imageUrl
      createdAt
    }
  `
}

export default LinkItem
