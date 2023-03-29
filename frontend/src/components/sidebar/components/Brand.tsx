// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import EconoSenseLogo from 'components/icons/EconoSenseIcon';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			{/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
			<EconoSenseLogo height='26px' width='175px' my='32px' color={logoColor} />
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
