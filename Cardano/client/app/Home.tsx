import ConfigDatumHolder from "@/components/transactions/configDatumHolder";
import Identification from "@/components/transactions/identificationnft";
import Validator_contract from "@/components/transactions/carbonTokenBurn";
import DisconnectButton from "@/components/WalletConnector/disconnect";
import EmulatorConnector from "@/components/WalletConnector/emulatorClient";
import { useWallet } from "@/context/walletContext";
import WalletComponent from "@/components/WalletConnector/connector";

export default function Home() {


  // if (!address) {
  //   return (
  //     <div className="space-y-6 mx-auto max-w-2xl flex flex-col min-h-screen items-center">
  //     </div>
  //   )
  // }
  return (
    <div className="space-y-6 mx-auto max-w-2xl flex flex-col min-h-screen items-center">
      <WalletComponent />
      {/* <EmulatorConnector /> */}
      <DisconnectButton />
      <Identification />
      <ConfigDatumHolder />
      <Validator_contract />
    </div>
  );
}
