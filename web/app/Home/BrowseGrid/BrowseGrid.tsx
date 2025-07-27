import * as React from "react";
import Grid from "@mui/material/Grid";
import flattenChildren from "react-keyed-flatten-children";

interface Props {
  children: React.ReactNode;
}

export function BrowseGrid({ children }: Props) {
  return (
    <Grid container rowSpacing={4} columnSpacing={2}>
      {React.Children.map(flattenChildren(children), (child) => (
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3, xl: 3, xxl: 3, xxxl: 3 }}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
}
