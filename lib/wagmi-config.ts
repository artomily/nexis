import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL ||
        "https://rpc.sepolia.org"
    ),
  },
  ssr: true,
});
