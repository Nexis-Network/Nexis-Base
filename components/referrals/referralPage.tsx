import type * as React from "react"

import { CopyLinkButton } from "./CopyLinkButton"
import { ReferralStats } from "./ReferralStats"

import "./referralPage.css"

export const ReferralPage: React.FC = () => {
  return (
    <div className="css-b95f0i">
      <div className="css-1j9re2m">
        <div className="css-u0h8bw">
          <div className="css-1c8opwj">
            <div className="css-lbp4ex">
              <div data-group="hover" className="css-1hepl0c">
                <img
                  alt="icon"
                  src="/icons/home.svg"
                  className="chakra-image css-0"
                />
                <a href="/">
                  <p className="chakra-text css-41n8ux">Home</p>
                </a>
              </div>
              <div data-group="hover" className="css-1hepl0c">
                <a href="/dashboard">
                  <p className="chakra-text css-41n8ux">The Minez</p>
                </a>
              </div>
              <div data-group="hover" className="css-1hepl0c">
                <a href="/referral-program">
                  <p className="chakra-text css-1vkarjy">Referral Program</p>
                </a>
              </div>
            </div>
            <p className="chakra-text css-14uki5x">Referral Program</p>
          </div>
          <div className="css-uo4v2a">
            <div className="css-2qoj18">
              <div className="css-13pmxen">
                <div className="css-k0384i">
                  <div
                    className="css-1hdbc19"
                    style={{ opacity: 1, transform: "none" }}
                  >
                    <div className="css-12a3pc2">
                      <p className="chakra-text css-1yc4n64">REFERRAL POINTS</p>
                      <p className="chakra-text css-1dkpjc5">0</p>
                      <div className="css-17xejub" />
                      <div className="css-1rn30of">
                        <p className="chakra-text css-1xl8goy">
                          0 People Invited
                        </p>
                      </div>
                      <div className="css-1rn30of">
                        <p className="chakra-text css-1xl8goy">
                          0 Active Ref Clients
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="css-1tbxgib">
                <div className="css-wtwner">
                  <p className="chakra-text css-sx598w">
                    Create your Referral Code
                  </p>
                  <p className="chakra-text css-6yjy0z">
                    You can only assign it once. The code will be used inside of
                    your referral link.
                  </p>
                  <div className="css-qu3oq3">
                    <input
                      placeholder="Enter you Ref Code"
                      className="chakra-input css-8y11ht"
                    />
                  </div>
                  <div className="css-17xejub" />
                  <div
                    className="css-1ln2799"
                    style={{ opacity: 1, transform: "none" }}
                  >
                    <button type="button" className="chakra-button css-d5vle6">
                      SKIP
                    </button>
                    <button
                      type="button"
                      className="chakra-button css-2mx6yu"
                      disabled
                    >
                      ASSIGN
                    </button>
                  </div>
                  <div
                    className="css-k008qs"
                    style={{ opacity: 1, transform: "none" }}
                  />
                </div>
              </div>
              <div className="css-rgr9or">
                <div className="css-1qi0yqb">
                  <div className="css-huskxe">
                    <div className="chakra-stack css-1rfq7px">
                      <p className="chakra-text css-sx598w">0 USDT</p>
                      <p className="chakra-text css-e8reog">
                        Comission earnings
                      </p>
                    </div>
                  </div>
                  <div className="css-17xejub" />
                  <p className="chakra-text css-shd4ye">
                    Claim will be available after the zNode Sale
                  </p>
                  <button
                    type="button"
                    className="chakra-button css-14fjaae"
                    disabled
                  >
                    Claim Rewards
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="css-mnigm9">
            <div className="chakra-stack css-1qc97x9">
              <img
                alt="shape"
                src="/shape.svg"
                className="chakra-image css-dcng39"
              />
              <p className="chakra-text css-xmqc1e">HOW'S THE REF LINK WORK?</p>
              <img
                alt="line"
                src="/lines/line.svg"
                className="chakra-image css-1eqmq6c"
              />
            </div>
            <div
              className="css-td4n87"
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="css-1s2z9ts">
                <img
                  alt="icon"
                  src="/referrals/personadd.svg"
                  className="chakra-image css-9uy14h"
                />
                <div className="chakra-stack css-1971m0s">
                  <p className="chakra-text css-i6d4l6">Refer your friends</p>
                  <p className="chakra-text css-1jfkb0e">
                    Share the link with your friends via X or any other social
                    network
                  </p>
                </div>
              </div>
              <div className="css-1frywoz">
                <img
                  alt="arrow"
                  src="/referrals/arrow-right.svg"
                  className="chakra-image css-9uy14h"
                />
              </div>
              <div className="css-1s2z9ts">
                <img
                  alt="icon"
                  src="/referrals/points.svg"
                  className="chakra-image css-9uy14h"
                />
                <div className="chakra-stack css-1971m0s">
                  <p className="chakra-text css-i6d4l6">
                    Get 15% of their total points
                  </p>
                  <p className="chakra-text css-1jfkb0e">
                    You will receive points from referral rClients
                  </p>
                </div>
              </div>
              <div className="css-1frywoz">
                <img
                  alt="arrow"
                  src="/referrals/arrow-right.svg"
                  className="chakra-image css-9uy14h"
                />
              </div>
              <div className="css-1s2z9ts">
                <img
                  alt="icon"
                  src="/referrals/comission.svg"
                  className="chakra-image css-9uy14h"
                />
                <div className="chakra-stack css-1971m0s">
                  <p className="chakra-text css-i6d4l6">Get a 10% commission</p>
                  <p className="chakra-text css-1jfkb0e">
                    Receive a commission for referral zNode purchases made
                    during the public node sale
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="css-ewshbf">
            <div className="chakra-stack css-1qc97x9">
              <img
                alt="shape"
                src="/shape.svg"
                className="chakra-image css-dcng39"
              />
              <p className="chakra-text css-xmqc1e">MY REFERRALS</p>
              <img
                alt="line"
                src="/lines/line.svg"
                className="chakra-image css-1hbwp7i"
              />
            </div>
            <div className="css-mnigm9">
              <div
                className="css-1iyqweb"
                style={{ opacity: 1, transform: "none" }}
              >
                <div className="css-1ijx439">
                  <div className="css-14ngfe9">
                    <p className="text-sm font-medium text-gray-600">Wallet</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-600">
                      Points earned
                    </p>
                    <img
                      alt="sort"
                      src="/icons/arrowdown.svg"
                      className="chakra-image css-0"
                    />
                  </div>
                  <div className="css-qchvsk">
                    <p className="chakra-text css-1c0owwx">Commission</p>
                    <img
                      alt="sort"
                      src="/icons/arrowdown.svg"
                      className="chakra-image css-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
