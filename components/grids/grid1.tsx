"use client"

import { Grid } from "@geist-ui/core"

export function Grid1(): JSX.Element {
  return (
    <Grid.Container gap={2}>
      <Grid className="border border-zinc-800" xs={6}>
        1
      </Grid>
      <Grid className="border border-zinc-800" xs={6}>
        2
      </Grid>
      <Grid className="border border-zinc-800" xs={12}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at felis
      </Grid>
      <Grid className="border border-zinc-800" xs={5}>
        3
      </Grid>
      <Grid className="border border-zinc-800" xs={7}>
        4
      </Grid>
    </Grid.Container>
  )
}
