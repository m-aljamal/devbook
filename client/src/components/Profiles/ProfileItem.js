import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <Card>
      <Image src={avatar} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>Joined in 2016</Card.Meta>
        <Card.Description>
          {status} {company && <span>at {company}</span>}
        </Card.Description>
        <Card.Description>
          {location && <span>{location}</span>}
          <ul>
            {skills.slice(0, 4).map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          <Link to={`/profile/${_id}`}>view profile</Link>
        </a>
      </Card.Content>
    </Card>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
