import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import {IconButton} from "@mui/material";
import { Rating } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
};

export default function BasicModal({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cdata, setcdata] = useState([]);
  const [cdata_ele1, setcdata_ele1] = useState([]);
  const [cdata_ele2, setcdata_ele2] = useState([]);
  const [cdata_ele3, setcdata_ele3] = useState([]);
  const [cdata_ele4, setcdata_ele4] = useState([]);
  let curl;
  async function fetchcData() {
    curl = `https://api.themoviedb.org/3/movie/${data.id}/credits?api_key=a5ba43a010dcb16ff724465d8f0a52b7&language=en-US`;
    const response = await axios.get(curl);
    setcdata(response.data.cast);
    setcdata_ele1(response.data.cast[0].profile_path);
    setcdata_ele2(response.data.cast[1].profile_path);
    setcdata_ele3(response.data.cast[2].profile_path);
    setcdata_ele4(response.data.cast[3].profile_path);
  }
  useEffect(() => {
    fetchcData();
    // console.log(data.length)
  }, [data]);

  return (
    <div>
      {/* <Button >Open modal</Button> */}
      <IconButton color="error" onClick={handleOpen} aria-label="add to favourite">
      <ExpandCircleDownOutlinedIcon/>
      </IconButton>
      {/* {console.log(cdata)} */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {data.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {data.overview}
          </Typography>
          <Rating
            name="read-only"
            value={Math.round(data.vote_average / 2)}
            readOnly
          />
          <Stack direction="row" spacing={2}>
            {console.log(cdata[0])}
            <Avatar
              alt="Remy Sharp"
              src={`https://image.tmdb.org/t/p/w500/${cdata_ele1}`}
              sx={{ width: 100, height: 100, objectFit: "cover" }}
            />
            <Avatar
              alt="Remy Sharp"
              src={`https://image.tmdb.org/t/p/w500/${cdata_ele2}`}
              sx={{ width: 100, height: 100, objectFit: "cover" }}
            />
            <Avatar
              alt="Remy Sharp"
              src={`https://image.tmdb.org/t/p/w500/${cdata_ele3}`}
              sx={{ width: 100, height: 100, objectFit: "cover" }}
            />
            <Avatar
              alt="Remy Sharp"
              src={`https://image.tmdb.org/t/p/w500/${cdata_ele4}`}
              sx={{ width: 100, height: 100, objectFit: "cover" }}
            />
            {/* <Avatar alt="Remy Sharp" src={`https://image.tmdb.org/t/p/w500${cdata[1].profile_path}`} sx={{ width: 100, height: 100,objectFit:"cover" } }/> */}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
