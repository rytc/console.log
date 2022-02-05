import Stack from '@mui/material/Stack'
import { bgcolor, display, flexbox, palette } from '@mui/system'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// Icons
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ChatIcon from '@mui/icons-material/Chat'
import SearchIcon from '@mui/icons-material/Search'
import {Link} from 'react-router-dom'

const RightSidebar = (props) => {
  const rightbarStyle = {
    flexDirection: 'column',
    height: '80vh',
    alignItems: 'center',
    marginTop: '1em',
    boxShadow: '3',
    bgcolor: 'primary.main',
    display: 'flex'
  }

  const listStyle = {
    width: '100%'
  }

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    mt: 1
  }

  const searchStyle = {
    display: 'block',
    justifyContent: 'center'
  }
  return (
    <Box sx={rightbarStyle}>
      <div sx={listStyle}>
        <List>
          <ListItem>
            <ListItemText>Topics</ListItemText>
          </ListItem>
          <Divider />
          <Box>
            <ListItem>
              <ListItemIcon><ChatIcon /></ListItemIcon>
              <ListItemText><Link to='/topic/APIs' underline='none' sx={{ color: 'black' }}>APIs</Link></ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><ChatIcon /></ListItemIcon>
              <ListItemText><Link to='/topic/React' underline='none' sx={{ color: 'black' }}>React</Link></ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><ChatIcon /></ListItemIcon>
              <ListItemText><Link to='/topic/Javascript' underline='none' sx={{ color: 'black' }}>Javascript</Link></ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon><ChatIcon /></ListItemIcon>
              <ListItemText><Link to='/topic/MongoDB' underline='none' sx={{ color: 'black' }}>MongoDB</Link></ListItemText>
            </ListItem>
          </Box>
          {/*
                    <Box sx={searchStyle}>
                        <TextField id="filled-basic" label="Search" variant="filled" />
                        <Box sx={buttonStyle}>
                            <Button variant="contained"><SearchIcon />Search</Button>
                        </Box>
                    </Box> */}
        </List>
      </div>
    </Box>
  )
}

export default RightSidebar
