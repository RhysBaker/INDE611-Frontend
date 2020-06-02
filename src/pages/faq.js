import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ImageIcon from "@material-ui/icons/Image";
import AddIcon from "@material-ui/icons/Add";

export class faq extends Component {
  render() {
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>How do i post a sketch?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              To post a sketch, all you have to do is head over to the draw page
              and create a masterpiece, save the doodl to your computer by
              pressing the P key on your keyboard. Then click the <AddIcon />
              symbol in the navigation bar. From here you can write the text for
              your sketch and click share. Your post should now appear on the
              home page where you can now click the <ImageIcon /> symbol on the
              sketch to add your masterpiece to the post
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Is there an eraser?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Yes! its hidden in the bottom right corner of the color picker.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default faq;
