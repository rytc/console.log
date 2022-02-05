import {
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Input,
  Button,
  Chip,
} from "@mui/material"
import { useNavigate } from "react-router-dom";
import Moment from 'moment-timezone';

const PostCard = (props) => {
  const { user, createdAt, content, topics, comments, _id } = props.post;
  const navigate = useNavigate();

  const postStyle = {
    border: "1px solid black",
    borderRadius: "8px",
    boxShadow: "4px 4px 8px #000",
    padding: "1em",
    marginBottom: "2em",
    bgcolor: "white",
    width: "95%"
  }

  const handleProfileClick = (event) => {
    event.preventDefault();
    navigate('/profile/' + user.username);
  }

  return (
    <Box sx={postStyle}>

      <Box align-items="flex-start" sx={{ display: "flex", cursor: "pointer" }} onClick={handleProfileClick}>
        <Avatar sx={{ margin: "0.5em" }} src={user.avatar}>{user.name[0]}</Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="sub">at {Moment(createdAt).tz('America/Los_Angeles').format('LLLL')}</Typography>
        </Box>

      </Box>
      <p dangerouslySetInnerHTML={{__html: content}} />

      <Box>
        <a href={"/post/" + _id}>{comments.length} comments</a>
        - Topics: {topics.map((topic, index) => {
          return (<Chip key={index} label={topic} size="small" color="primary" onClick={() => window.location = "/topic/" + topic} />)
        })}
      </Box>
    </Box>
  )
}

export default PostCard