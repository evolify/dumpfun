"use client"

import { Launchpad } from "@/types"
import { getQuery } from "@/utils/client"

export const launchpad = getQuery<Launchpad>("launchpad", Launchpad.PumpFun)!
