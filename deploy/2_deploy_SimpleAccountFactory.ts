import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const deploySimpleAccountFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const provider = ethers.provider
  console.log('2_deploy_SimpleAccountFactory.ts:6');
  const from = await provider.getSigner().getAddress()
  console.log('2_deploy_SimpleAccountFactory.ts:8');
  const network = await provider.getNetwork()
  console.log('2_deploy_SimpleAccountFactory.ts:10');
  // only deploy on local test network.
  // if (network.chainId !== 31337 && network.chainId !== 1337) {
  //   return
  // }

  console.log('2_deploy_SimpleAccountFactory.ts:16');
  const entrypoint = await hre.deployments.get('EntryPoint')
  console.log('2_deploy_SimpleAccountFactory.ts:18');
  const ret = await hre.deployments.deploy(
    'SimpleAccountFactory', {
      from,
      args: [entrypoint.address],
      gasLimit: 6e6,
      log: true,
      deterministicDeployment: true
    })
  console.log('2_deploy_SimpleAccountFactory.ts:27');
  console.log('==SimpleAccountFactory addr=', ret.address)
}

export default deploySimpleAccountFactory
