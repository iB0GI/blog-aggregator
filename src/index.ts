import { setUser, readConfig } from "./config";
function main() {
  setUser("Marko");
  const config = readConfig();
  console.log(config);
}

main();
