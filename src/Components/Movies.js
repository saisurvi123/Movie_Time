import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Modal from "./Modal";
import "./Movies.css";
import Stack from "@mui/material/Stack";
import {IconButton} from "@mui/material";
import Basicsnackbar from "./Basicsnackbar"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
const api_key = "a5ba43a010dcb16ff724465d8f0a52b7";
const imageurl = "https://image.tmdb.org/t/p/w500";

function Movies({ title, urltype }) {
  const [data, setdata] = useState([]);

  async function fetchData() {
    const response = await axios.get(urltype);
    // console.log(response.data.results)
    setdata(response.data.results);
  }
  useEffect(() => {
    fetchData();
    // console.log(data.length)
  }, [urltype]);

  // console.log(data[0]);
  // console.log(urltype)
  return (
    <>
      <h3 className="my-5" style={{ color: "white" }}>
        {title}
      </h3>
      <div className="row">
        {data.map((element) => {
          return (
            <div className="col col-md-2">
              <Card sx={{ maxWidth: 345 }} className="img">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${imageurl}${element.backdrop_path}`}
                    alt="green iguana"
                  />
                  <CardContent
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {element.title}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Modal data={element} />
                      <Basicsnackbar data={element.title}/>
                      <IconButton
                        color="error"
                        aria-label="add to favourite"
                      >
                      <PlaylistAddOutlinedIcon/>
                      </IconButton>
                    </Stack>
                    {/* <Typography component="legend">Read only</Typography>
                  <Rating name="read-only" value={value} readOnly /> */}
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Movies;
