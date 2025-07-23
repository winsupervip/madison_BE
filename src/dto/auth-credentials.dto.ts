import { IsNumberString, IsString, Length, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString({ message: 'Tài khoản không được để trống' })
  @Length(8, 30, { message: 'Tài khoản phải bao gồm 8-30 ký tự' })
  @Matches(/^([a-zA-Z0-9.]+@){0,1}([a-zA-Z0-9.])+$/, {
    message: 'Vui lòng nhập tài khoản hợp lệ',
  })
  username: string;

  @IsString({ message: 'Mật khẩu không được để trống' })
  @Length(8, 30, { message: 'Mật khẩu phải bao gồm 8-30 ký tự' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Mật khẩu phải bao gồm 1 chữ hoa,1 chữ thường,1 ký tự đặc biệt',
  })
  password: string;

  @IsString({ message: 'Tên hiển thị không được để trống' })
  displayName: string;

  @IsNumberString(
    {},
    {
      message: 'Vui lòng nhập số điện thoại hợp lệ',
    },
  )
  @Matches(/^0\d{9,12}$/, { message: 'Số điện thoại không hợp lệ' })
  phone: string;
}
export class BodyChangePasswordDto {
  userId: string;
  currentPassword: string;
  @IsString({ message: 'Mật khẩu mới không được để trống' })
  @Length(8, 30, { message: 'Mật khẩu mới phải bao gồm 8-30 ký tự' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Mật khẩu mới phải bao gồm 1 chữ hoa,1 chữ thường,1 ký tự đặc biệt',
  })
  newPassword: string;
}
