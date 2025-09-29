import { CourseModel } from '../models/Course'

export async function getCourse() {
  const course = await CourseModel.findOne()
  if (!course) throw new Error('No course found')
  return course
}