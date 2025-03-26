
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Header() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 py-4",
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            DN
          </motion.div>
          <span className="font-bold text-xl">DataNavigator</span>
        </Link>

        {isMobile ? (
          <MobileNav currentPath={location.pathname} />
        ) : (
          <DesktopNav currentPath={location.pathname} />
        )}
      </div>
    </motion.header>
  );
}

function DesktopNav({ currentPath }: { currentPath: string }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              active={currentPath === "/"}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/browser">
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              active={currentPath === "/browser"}
            >
              Data Browser
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Ferramentas</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      {
                        "bg-accent text-accent-foreground":
                          currentPath === "/transformation",
                      }
                    )}
                    to="/transformation"
                  >
                    <div className="text-sm font-medium leading-none">
                      Transformação de Dados
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Extrai e converte dados de PDFs para formatos estruturados
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      {
                        "bg-accent text-accent-foreground":
                          currentPath === "/database",
                      }
                    )}
                    to="/database"
                  >
                    <div className="text-sm font-medium leading-none">
                      Banco de Dados
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Scripts SQL e análises de demonstrações contábeis
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      {
                        "bg-accent text-accent-foreground":
                          currentPath === "/api",
                      }
                    )}
                    to="/api"
                  >
                    <div className="text-sm font-medium leading-none">
                      API
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Interface para busca textual de operadoras de saúde
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Button className="ml-2" size="sm">
            Iniciar
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNav({ currentPath }: { currentPath: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col gap-4">
          <SheetClose asChild>
            <Link
              to="/"
              className={cn(
                "px-4 py-2 rounded-md transition-colors hover:bg-accent",
                {
                  "bg-accent text-accent-foreground": currentPath === "/",
                }
              )}
            >
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to="/browser"
              className={cn(
                "px-4 py-2 rounded-md transition-colors hover:bg-accent",
                {
                  "bg-accent text-accent-foreground": currentPath === "/browser",
                }
              )}
            >
              Data Browser
            </Link>
          </SheetClose>
          <div className="px-4 font-medium py-2">Ferramentas</div>
          <SheetClose asChild>
            <Link
              to="/transformation"
              className={cn(
                "px-4 py-2 ml-2 rounded-md transition-colors hover:bg-accent",
                {
                  "bg-accent text-accent-foreground":
                    currentPath === "/transformation",
                }
              )}
            >
              Transformação de Dados
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to="/database"
              className={cn(
                "px-4 py-2 ml-2 rounded-md transition-colors hover:bg-accent",
                {
                  "bg-accent text-accent-foreground":
                    currentPath === "/database",
                }
              )}
            >
              Banco de Dados
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to="/api"
              className={cn(
                "px-4 py-2 ml-2 rounded-md transition-colors hover:bg-accent",
                {
                  "bg-accent text-accent-foreground": currentPath === "/api",
                }
              )}
            >
              API
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Button className="mt-4">Iniciar</Button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default Header;
