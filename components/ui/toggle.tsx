import { useState, type JSX } from "react"
import { Toggle } from "@geist-ui/core"
import { Container } from "lucide-react"

export function Component(): JSX.Element {
  const [checked, setChecked] = useState(false)
  const [checked2, setChecked2] = useState(true)

  return (
    <Container>
      <Container>
        <Toggle
          aria-label="Enable Firewall"
          checked={checked}
          onChange={(): void => setChecked(!checked)}
          className="bg-[#181F25] data-[state=checked]:bg-lime-300"
        />
      </Container>

      <Container>
        <Toggle
          aria-label="Enable Firewall"
          checked={checked2}
          onChange={(): void => setChecked2(!checked2)}
        />
      </Container>
    </Container>
  )
}
