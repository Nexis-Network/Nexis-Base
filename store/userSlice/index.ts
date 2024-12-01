import { type PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export interface Quest {
  id: string
  title: string
  image?: string
  imageHeight?: string
  isLoadingTwo?: boolean
  buttonTwo?: string
  successButtonTwo?: string
  isLoading?: boolean
  completed?: boolean
  description?: string
  point?: string
  isActive?: boolean
  button?: string
  link?: string
  isFunction?: boolean
}

export interface LeaderboardUser {
  id: string
  walletAddress: string
  walletAgeInDays: number
  points: number
}

interface WalletData {
  totalNZT: string
  unlockedNZT: string
  vestedNZT: string
  estDailyUnlocked: string
  vestingPeriod: string
  delegatedNZT: string
  nodeLicenses: string
}

interface UserState {
  walletData: WalletData | null
  isQuestModalOpen: boolean
  selectedQuest: Quest
  leaderboardUsers: LeaderboardUser[]
  isLeaderboardUsersLoading: boolean
  lastLeaderboardUserId: string
  isLeaderboardUsersFinished: boolean
  user: {
    id: string
    walletAddress: string
    points: number
    walletAgeInDays: number
  } | null
}

const initialState: UserState = {
  walletData: null,
  isQuestModalOpen: false,
  selectedQuest: {
    id: "",
    title: "",
  },
  leaderboardUsers: [],
  isLeaderboardUsersLoading: false,
  lastLeaderboardUserId: "",
  isLeaderboardUsersFinished: false,
  user: null,
}

export const fetchLeaderboardUsers = createAsyncThunk(
  "user/fetchLeaderboard",
  async ({ lastId }: { lastId?: string }) => {
    const response = await fetch(`/api/leaderboard${lastId ? `?lastId=${lastId}` : ""}`)
    return response.json()
  }
)

export const generateTwitterAuthUrl = createAsyncThunk(
  "user/generateTwitterAuthUrl",
  async () => {
    const response = await fetch("/api/twitter/auth")
    return response.text()
  }
)

export const verifyQuest = createAsyncThunk(
  "user/verifyQuest",
  async ({ endpoint }: { endpoint: string }) => {
    const response = await fetch(endpoint)
    return response.json()
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setWalletData: (state, action: PayloadAction<WalletData>) => {
      state.walletData = action.payload
    },
    setIsQuestModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isQuestModalOpen = action.payload
    },
    setLeaderboardUsers: (state, action: PayloadAction<LeaderboardUser[]>) => {
      state.leaderboardUsers = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboardUsers.pending, (state) => {
        state.isLeaderboardUsersLoading = true
      })
      .addCase(fetchLeaderboardUsers.fulfilled, (state, action) => {
        state.isLeaderboardUsersLoading = false
        if (action.payload.length) {
          state.leaderboardUsers = [...state.leaderboardUsers, ...action.payload]
          state.lastLeaderboardUserId = action.payload[action.payload.length - 1].id
        } else {
          state.isLeaderboardUsersFinished = true
        }
      })
      .addCase(verifyQuest.pending, (state) => {
        if (state.selectedQuest) {
          state.selectedQuest.isLoadingTwo = true
        }
      })
      .addCase(verifyQuest.fulfilled, (state) => {
        if (state.selectedQuest) {
          state.selectedQuest.isLoadingTwo = false
          state.selectedQuest.buttonTwo = state.selectedQuest.successButtonTwo ?? "Verified"
        }
      })
      .addCase(verifyQuest.rejected, (state, action) => {
        if (state.selectedQuest) {
          state.selectedQuest.isLoadingTwo = false
          if (action.error.message === "409") {
            state.selectedQuest.buttonTwo = "Already Verified"
            state.isQuestModalOpen = false
          } else {
            state.selectedQuest.buttonTwo = "Try Again Later"
          }
        }
      })
  },
})

export const selectUserSlice = (state: RootState) => state.user
export const { setWalletData, setIsQuestModalOpen, setLeaderboardUsers } = userSlice.actions
export default userSlice.reducer
