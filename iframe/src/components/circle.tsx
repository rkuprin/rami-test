import React from "react"
import { CircleProps } from "../models/circle.model"
import styles from "./circle.module.scss"

const Circle = (props: CircleProps) => {
  const { green } = props

  return (
    <div
      className={styles.circle}
      style={{ backgroundColor: green ? "green" : "red" }}
    ></div>
  )
}

export default Circle
