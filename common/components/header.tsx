import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  getAxiomLink,
  getBonkbotLink,
  getFavicon,
  getGmgnbotLink,
  getGmgnLink,
  getPepeboostLink,
} from "@/utils"
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu"
import { MenuIcon } from "lucide-react"
import { LaunchpadConfig } from "@/constants"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { cn } from "@/lib/utils"
import { TrackLabel } from "@/utils/track"
import { NavLink } from "./nav-link"

interface MenuItem {
  label: string
  value?: string
  trackLabel?: TrackLabel
  icon?: string
  children?: MenuItem[]
}

const menus: MenuItem[] = [
  {
    label: "Launchpads",
    children: Object.values(LaunchpadConfig).map(t => ({
      label: t.name,
      value: t.url,
      trackLabel: TrackLabel.LAUNCHPAD,
      icon: getFavicon(t.home),
    })),
  },
  {
    label: "Telegram Bot",
    children: [
      {
        label: "GMGN Bot",
        value: getGmgnbotLink(),
        trackLabel: TrackLabel.GMGN_BOT,
      },
      {
        label: "Bonk Bot",
        value: getBonkbotLink(),
        trackLabel: TrackLabel.BONK_BOT,
      },
      {
        label: "Pepeboost Bot",
        value: getPepeboostLink(),
        trackLabel: TrackLabel.PEPEBOOST_BOT,
      },
    ],
  },
  {
    label: "Axiom",
    value: getAxiomLink(),
    trackLabel: TrackLabel.AXIOM,
  },
  {
    label: "GMGM",
    value: getGmgnLink(),
    trackLabel: TrackLabel.GMGN,
  },
]

interface Props {
  title?: React.ReactNode
  subTitle?: React.ReactNode
}

export default function Header(props: Props) {
  const { title = <div className="text-xl font-bold">Dumpfun</div>, subTitle } =
    props
  return (
    <header className="flex flex-row items-center h-14 px-4">
      {/* sidebar menu */}
      <div className="mr-4 md:hidden flex flex-row items-center">
        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetTitle className="sr-only" />
          <SheetContent side="left">
            <SheetHeader>Dumpfun</SheetHeader>
            <ul>
              {menus.map(item => (
                <li
                  key={item.label}
                  className={cn(
                    "flex flex-col px-6",
                    item.children && "text-sm text-gray-400"
                  )}
                >
                  {item.children ? (
                    <>
                      <ul className="w-50 py-2">
                        <span>{item.label}</span>
                        {item.children.map(t => (
                          <NavLink
                            key={t.label}
                            label={t.label}
                            value={t.value!}
                            icon={t.icon}
                            trackLabel={t.trackLabel!}
                          />
                        ))}
                      </ul>
                    </>
                  ) : (
                    <NavLink
                      label={item.label}
                      value={item.value!}
                      icon={item.icon}
                      trackLabel={item.trackLabel!}
                    />
                  )}
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
      {title}
      {subTitle && (
        <div className="ml-auto text-sm text-blue-100">{subTitle}</div>
      )}

      {/* top menu */}
      <NavigationMenu
        className="ml-auto hidden md:block"
        orientation="vertical"
      >
        <NavigationMenuList>
          {menus.map(item => (
            <NavigationMenuItem key={item.label}>
              {item.children ? (
                <>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-50">
                      {item.children.map(t => (
                        <NavLink
                          key={t.label}
                          label={t.label}
                          value={t.value!}
                          icon={t.icon}
                          trackLabel={t.trackLabel!}
                        />
                      ))}
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavLink
                  label={item.label}
                  value={item.value!}
                  icon={item.icon}
                  trackLabel={item.trackLabel!}
                />
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
