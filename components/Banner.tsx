import React from 'react';
import { Box, Button, Flex, Image, Text, keyframes } from '@chakra-ui/react';

const RectangularBanner = () => {
    const bounceKeyframes = keyframes`
    0%, 100% {
      transform: rotate(15deg) translateX(0);
    }
    50% {
      transform: rotate(15deg) translateX(-20px);
    }
  `;
  
  return (
    <Flex 
        bgImage="url('/images/banner-nft-1.png')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        color="white"
        p={4}
        align="center"
        width="85%" 
        h="300px"
        position="relative"
        borderRadius="15px"
    >
      <Box flex="1" paddingLeft="20px">
        <Text fontSize="30px" fontWeight="900" lineHeight="40px">Get or Give the Right to Use a Copywrited <br/>Work</Text>
        <Box display="flex" gap="10px" mt="15px">
            <Button variant="outline" colorScheme="white">Give RYTU</Button>
            <Button variant="outline" colorScheme="white">Get RYTU</Button>
        </Box>
      </Box>
      
      <Box flex="1">
        <Flex direction="column" mt={4} position="relative">
            <Image 
                src="/images/banner-nft-research.png" 
                alt="Image 1"  
                w="30%"
                position="absolute"
                top="-140px" 
                width="170px" 
                borderRadius="14px" 
                transform="rotate(15deg)"
                opacity=".95" 
                right="10"
                animation={`${bounceKeyframes} 4s infinite`}
            />
            
            <Image 
                src="/images/banner-nft-photo.png" 
                alt="Image 1"  
                w="30%"
                position="absolute"
                top="-160px" 
                width="190px" 
                borderRadius="14px" 
                transform="rotate(15deg)"
                opacity=".95" 
                right="20"
                animation={`${bounceKeyframes} 5s infinite`}
            />

            <Image 
                src="/images/banner-nft-music.png" 
                alt="Image 1"  
                w="30%"
                position="absolute"
                top="-180px" 
                width="210px" 
                borderRadius="14px" 
                transform="rotate(15deg)"
                opacity=".95" 
                right="120"
                border=".5px solid #fff"
                animation={`${bounceKeyframes} 3s infinite`}
            />
        </Flex>
      </Box>
    </Flex>
  );
};

const SquareBanner = () => {
  return (
    <Box 
        bgImage="url('/images/banner-nft-2.png')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        color="white"
        p={4}
        align="center"
        borderRadius="15px"
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <div>
            <Text 
                fontSize="30px" 
                fontWeight="700" 
                color="#003f42"
                border="1px solid"
                borderColor="rytuGreen.100"
                borderRadius="10px"
                backgroundColor="#ffffff36"
                padding="20px 0"
                lineHeight="40px"
            >RYTU Chrome Extension</Text>
            <Button 
                variant="outline" 
                colorScheme="white" 
                mt="20px" 
                backgroundColor="rytuRed.50"
                borderColor="rytuRed.50"
                >
                Download here
            </Button>
        </div>
    </Box>
  );
};

export { RectangularBanner, SquareBanner };
