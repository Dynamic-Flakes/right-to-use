import { Button, ButtonProps, Text } from '@chakra-ui/react'
import { HiOutlineArrowLeft } from '@react-icons/all-files/hi/HiOutlineArrowLeft'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

const BackButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { t } = useTranslation('components')
  return (
    <Button
      variant="outline"
      colorScheme="gray"
      backgroundColor="rytuGreen.50"
      borderColor="rytuRed.50"
      css={{
        '&:focus': {
          border: '1px solid',
          borderColor: '#e33047',
          backgroundColor: '#e33047',
          color: 'white',
          outline: 'none',
        },
        '&:hover': {
          border: '1px solid',
          borderColor: '#e33047',
          backgroundColor: '#e33047',
          color: 'white',
          outline: 'none',
        },
      }}
      leftIcon={<HiOutlineArrowLeft />}
      {...props}
    >
      <Text as="span" isTruncated>
        {children ? children : t('back')}{' '}
      </Text>
    </Button>
  )
}

export default BackButton
