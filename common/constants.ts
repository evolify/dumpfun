import { Launchpad } from "./types"
import { getLaunchpadLink } from "./utils"

const { PumpFun, BonkFun, JupStudio, Believe, Moonshot } = Launchpad
export const LaunchpadConfig = {
  [PumpFun]: {
    launchpad: "pump.fun",
    name: "Pumpfun",
    url: getLaunchpadLink(PumpFun),
    home: "pump.fun",
  },
  [BonkFun]: {
    launchpad: "letsbonk.fun",
    name: "Letsbonk",
    url: getLaunchpadLink(BonkFun),
    home: "letsbonk.fun",
  },
  [JupStudio]: {
    launchpad: "jup-studio",
    name: "Jup studio",
    url: getLaunchpadLink(JupStudio),
    home: "jup.ag",
  },
  [Believe]: {
    launchpad: "believe",
    name: "Believe",
    url: getLaunchpadLink(Believe),
    home: "believe.app",
  },
  [Moonshot]: {
    launchpad: "moonshot",
    name: "Moonshot",
    url: getLaunchpadLink(Moonshot),
    home: "moonshot.money",
  },
}
