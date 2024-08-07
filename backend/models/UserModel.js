import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    surname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    proofOfIdentity: {
      type: String,
      required: true,
      trim: true,
    },
    proofOfIdentityAddress: {
      type: String,
      required: true,
      trim: true,
    },
    residenceAddress: {
      type: String,
      required: true,
      trim: true,
    },
    education: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    otp: {
      type: String,
      trim: true,
    },
    otpExpires: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
        type: String,
        default: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fuxwing.com%2Fwp-content%2Fthemes%2Fuxwing%2Fdownload%2Fpeoples-avatars%2Fdefault-profile-picture-male-icon.svg&tbnid=HKH80KjEYoYrMM&vet=12ahUKEwiO-NT9-LOCAxU-uScCHT2GDb8QMygVegUIARCgAQ..i&imgrefurl=https%3A%2F%2Fuxwing.com%2Fdefault-profile-picture-male-icon%2F&docid=4dYJsNXJ3jLinM&w=800&h=800&q=profile%20image&ved=2ahUKEwiO-NT9-LOCAxU-uScCHT2GDb8QMygVegUIARCgAQ'
    }
  },
  {
    timestamps: true,
  }
);

// Ensure unique indexes for fields that should be unique
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ phoneNumber: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
