
import { useWallet } from "@/context/walletContext";
import { Button } from "../ui/button";
import { emulator } from "@/config/emulator";
import { getAddress } from "@/lib/utils";
import { ConfigDatumHolderValidator, ValidatorContract, ValidatorMinter } from "@/config/scripts/scripts";

export default function DisconnectButton() {
    const [walletConnection] = useWallet();
    const { lucid } = walletConnection


    async function logContracts() {
        if (!lucid) throw new Error("Lucid not initialized")
        const configValidatorAddress = getAddress(ConfigDatumHolderValidator)
        const validatorContractAddress = getAddress(ValidatorContract)
        const validatorMinterAddress = getAddress(ValidatorMinter)
        // ------------------------------------------------------------------
        const configValidatorUtxo = await lucid.utxosAt(configValidatorAddress);
        const validatorContractUtxo = await lucid.utxosAt(validatorContractAddress);
        const validatorMinterUtxo = await lucid.utxosAt(validatorMinterAddress);

        console.log("Config Validator Utxo", configValidatorUtxo)
        console.log("Validator Contract Utxo", validatorContractUtxo)
        console.log("Validator Minter Utxo", validatorMinterUtxo)
    }
    async function emulatorlog() {
        awaitemulator()
        emulator.log()
        logContracts()
    }

    async function awaitemulator() {
        emulator.awaitBlock(1);
        console.log("Emulator Block Height", emulator.blockHeight)
    }
    return (
        <div className="flex space-x-4">
            <Button onClick={emulatorlog} className="w-fit bg-amber-400">Emulator Log</Button>
            <Button onClick={awaitemulator} className="w-fit bg-amber-400">Await Emulator</Button>
        </div>
    );
}