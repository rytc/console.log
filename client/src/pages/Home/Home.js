import AppHeader from '../../components/AppHeader'
import AppFooter from '../../components/AppFooter'
import Container from '@mui/material/Container'
import MainSidebar from '../../components/MainSidebar'
import RightSidebar from '../../components/RightSidebar'
import UserHomepage from '../../components/UserHomepage'
import {
  Grid, Box, FormControlLabel, Typography, TextField, Button, Checkbox
} from '@mui/material'
import {
  Send as SendIcon
} from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import PostCard from '../../components/PostCard'

// Axios
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const Home = (props) => {
  const [pagePosts, setPagePosts] = useState([]);

  useEffect(() => {
    axios.get('/api/post', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(({ data }) => {
      setPagePosts(data);
    })

  }, [])

  return (
    <>
      <AppHeader />
      <Container>
        <Box sx={{
          display: 'grid',
          columnGap: 3,
          rowGap: 2,
          gridTemplateColumns: 'repeat(5, 1fr)',
        }}>

          
          <Box sx={{gridColumn: 'span 5'}}>
            <Typography variant="h4">New post</Typography>
          <TextField
            fullWidth
            sx={{ mt: "1em" }}
            id="outlined-textarea fullWidth"
            label="Send a Post"
            multiline
            rows={4}
            placeholder="Text"
            //onChange={handlePostChange}
            className="backgroundColor"
          // sx={textfieldStyle}
          />
          <FormControlLabel label="APIs" componentsProps={{ typography: { variant: 'h6' } }} control={<Checkbox color="success" name="APIs" />} />
          <FormControlLabel label="React" componentsProps={{ typography: { variant: 'h6' } }} control={<Checkbox name="React" color="default" />} />
          <FormControlLabel label="Javascript" componentsProps={{ typography: { variant: 'h6' } }} control={<Checkbox name="Javascript" color="secondary" />} />
          <FormControlLabel label="MongoDB" componentsProps={{ typography: { variant: 'h6' } }} control={<Checkbox name="MongoDB" color="warning" />} />


          <Button variant="contained" endIcon={<SendIcon />} >
            Send
          </Button>
          </Box>

          <Box sx={{gridColumn: 'span 4'}}>
            {pagePosts.map((elem, i) => <PostCard key={i} post={elem} />)}
          </Box>
          <Box>World This is atest of the second box, I wonder how big it is</Box>
        </Box>
      </Container>
      <AppFooter />
    </>
  );
}

export default Home
