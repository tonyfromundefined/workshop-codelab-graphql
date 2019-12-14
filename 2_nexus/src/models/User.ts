/**
 * 주의!
 * 실제 어플리케이션에서는 데이터 저장에 DB를 쓰는것이 일반적입니다.
 * 본 코드랩에서는 DB 설정 및 사용에 관한 내용을 담지 않으므로,
 * JavaScript로 가상의 DB를 직접 구현합니다.
 */

export type User = {
  id: string
  name: string
  imageUrl: string
}

const _users: User[] = []

export function find() {}

export function findOne(id: string) {
  return _users.find((user) => user.id === id)
}

export function create() {}

export function update() {}

export function remove() {}
