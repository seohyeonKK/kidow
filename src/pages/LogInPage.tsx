import React, { useState } from 'react'
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ViewStyle,
  KeyboardAvoidingView,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as EmailValidator from 'email-validator'
import { color, size } from 'common'
import { BottomButton } from 'components'
import { Warning } from 'svgs'

interface InputFieldProps {
  /** 위에 달리는 라벨 */
  fieldName?: string
  /** 텍스트가 입력되지 않을 때 회색 글씨, place holder */
  placeHolder: string
  /** 입력되는 텍스트 */
  value: string
  /** 텍스트 입력될 때 바꿔주는 함수 */
  setValue: React.Dispatch<React.SetStateAction<string>>
  /** 받은 텍스트가 유효한지(이메일 형식, 비밀번호 일치 확인 등)의 여부 */
  isInvalid?: boolean
  /** 유효하지 않을 때 경고 문구 */
  invalidInputWarningLabel?: string
  /** 보안이 필요한 입력인지 */
  isSecureInput?: boolean
  /** 추가 스타일 */
  style?: ViewStyle
}

/** 이메일, 비밀번호 등을 입력하는 TextInput 란 */
function InputField({
  fieldName,
  placeHolder,
  value,
  setValue,
  isInvalid,
  invalidInputWarningLabel,
  isSecureInput,
  style,
}: InputFieldProps) {
  return (
    <View style={[{ height: 80 * size.widthRate }, { ...style }]}>
      {fieldName && (
        <Text
          style={{
            fontFamily: 'BMJUA',
            fontSize: size.normalizeFontSize(14),
            color: color.text.primary1,
            marginBottom: 8 * size.heightRate,
            marginLeft: 16 * size.widthRate,
          }}>
          {fieldName}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: color.palette.mainDark,
          borderWidth: 1 * size.widthRate,
          borderRadius: 8 * size.widthRate,
          paddingHorizontal: 16 * size.widthRate,
        }}>
        <TextInput
          style={{
            width: 300 * size.widthRate,
            height: 40 * size.widthRate,
            borderRadius: 8 * size.widthRate,
            borderColor: color.palette.black4,
            fontFamily: 'BMJUA',
            fontSize: size.normalizeFontSize(16),
            letterSpacing: 0.5 * size.widthRate,
            color: color.text.primary1,
          }}
          placeholder={placeHolder}
          onChangeText={(text) => setValue(text)}
          value={value}
          keyboardType={'email-address'}
          secureTextEntry={isSecureInput}
        />
        {isInvalid && <Warning style={{ marginLeft: -32 * size.widthRate }} />}
      </View>
      {isInvalid && (
        <Text
          style={{
            fontFamily: 'BMJUA',
            fontSize: size.normalizeFontSize(12),
            color: color.text.warning,
            marginTop: 6 * size.heightRate,
            marginLeft: 16 * size.widthRate,
          }}>
          {invalidInputWarningLabel}
        </Text>
      )}
    </View>
  )
}

/** 회원가입 페이지 */
export default function LogIn() {
  const navigation = useNavigation()

  /** 이메일 주소 */
  const [emailAddress, setEmailAddress] = useState('')
  /** 비밀번호 */
  const [password, setPassword] = useState('')
  /** 이메일 주소 유효성 여부 */
  const [isInvalidEmailAddress, setIsInvalidEmailAddress] = useState(false)
  /** 비밀번호 일치 여부 */
  const [isIncorrectPassword, setIsIncorrectPassword] = useState(false)

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingVertical: 128 * size.heightRate,
          paddingHorizontal: 28 * size.widthRate,
          backgroundColor: color.background.default,
        }}>
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={200 * size.heightRate} behavior={'position'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ width: '100%', height: '100%' }}>
              <Text
                style={{
                  fontFamily: 'BMJUA',
                  fontSize: size.normalizeFontSize(32),
                  color: color.text.primary1,
                  top: 0,
                  marginBottom: 102 * size.heightRate,
                }}>
                로그인
              </Text>
              <InputField
                fieldName={'이메일'}
                placeHolder={'이메일'}
                value={emailAddress}
                setValue={setEmailAddress}
                isInvalid={isInvalidEmailAddress}
                invalidInputWarningLabel={'이메일 형식이 올바르지 않거나 가입 정보가 없습니다.'}
                style={{ marginBottom: 12 * size.heightRate }}
              />
              <InputField
                fieldName={'비밀번호'}
                placeHolder={'비밀번호'}
                value={password}
                setValue={setPassword}
                isSecureInput={true}
                isInvalid={isIncorrectPassword}
                invalidInputWarningLabel={'비밀번호가 올바르지 않습니다.'}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
      <Image
        source={require('logos/logo.png')}
        style={{
          width: 200 * size.widthRate,
          height: 200 * size.widthRate,
          position: 'absolute',
          alignSelf: 'center',
          top: 280 * size.heightRate,
          opacity: 0.08,
        }}
      />
      <BottomButton
        label={'다음'}
        isDisabled={emailAddress === '' || password === ''}
        onPress={() => {
          // if (EmailValidator.validate(emailAddress)) { navigation.navigate('NameInput')}
          // else{ setIsInvalidEmailAddress(true)}
          const emailInvalidate = !EmailValidator.validate(emailAddress)
          const passwordIncorrect = password !== 'password'
          switch (true) {
            case true:
              setIsInvalidEmailAddress(emailInvalidate)
              if (emailInvalidate) {
                break
              }
            case true:
              setIsIncorrectPassword(passwordIncorrect)
              if (passwordIncorrect) {
                break
              }
            default:
              navigation.navigate('RootStackNavigator')
          }
        }}
      />
    </View>
  )
}
